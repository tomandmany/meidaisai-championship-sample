// @/actions/insertVote.ts
'use server';

import { getVotesHistory } from '@/data/getVotesHistory';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
import { extractDayFromDate, mapDateToDay } from '@/lib/voteUtils';
import { revalidatePath } from 'next/cache';

interface InsertVoteParams {
  user_id: string;
  programs: { id: string; title: string; department: string; date: string }[];
  testDate?: Date;
}

const days = ['2024-11-02', '2024-11-03', '2024-11-04'];

export async function insertVote({
  user_id,
  programs,
  testDate,
}: InsertVoteParams): Promise<string> {
  console.log('Inserting votes:', { programs, testDate });

  // ユーザーが存在するか確認
  const { data: userExists, error: userCheckError } = await supabase
    .from('users')
    .select('id')
    .eq('user_id', user_id)
    .single();

  if (
    userCheckError &&
    userCheckError.message.includes('invalid input syntax')
  ) {
    console.error('ユーザーIDの形式が無効です:', user_id);
    throw new Error('ユーザーIDの形式が無効です');
  }

  if (!userExists) {
    const { error: insertUserError } = await supabase.from('users').insert({
      user_id,
      created_at: getJSTDate(new Date()),
    });

    if (insertUserError) {
      console.error('ユーザー追加エラー:', insertUserError.message);
      throw new Error('新しいユーザーの追加中にエラーが発生しました');
    }
    console.log('新しいユーザーが追加されました:', user_id);
  }

  const votesHistory = await getVotesHistory(user_id);

  // **投票済みかどうかを日付ごとにチェック**
  const isAlreadyVoted = (programId: string, day: string) => {
    return votesHistory.some((vote) => {
      const voteDate = new Date(vote.created_at).toISOString().split('T')[0];
      const voteDay = mapDateToDay(voteDate);
      return vote.program_id === programId && voteDay === day;
    });
  };

  programs.forEach((program) => {
    // const today = testDate ? getJSTDate(testDate) : new Date();
    // const todayStr = today.toISOString().split('T')[0];
    const today = (testDate ? getJSTDate(testDate) : getJSTDate()) as string;
    const todayStr = new Date(today).toISOString().split('T')[0];
    const todayMappedDay = mapDateToDay(todayStr);

    const programDays =
      program.date === '全日'
        ? days.map(mapDateToDay) // 全日なら全ての日を対象
        : [extractDayFromDate(program.date)];

    // 今日が対象の日に含まれ、かつ未投票であれば投票可能
    const isVotableToday =
      programDays.includes(todayMappedDay) &&
      !isAlreadyVoted(program.id, todayMappedDay);

    if (!isVotableToday) {
      console.error('すでに投票済みです:', program, todayMappedDay);
      throw new Error(
        `すでに投票済みです: ${program.title} (${todayMappedDay})`
      );
    }
  });

  const votesData = programs.map((program) => ({
    user_id,
    created_at: testDate ? getJSTDate(testDate) : getJSTDate(),
    department: program.department,
    program_id: program.id,
    program_name: program.title,
  }));

  const { error: insertError } = await supabase.from('votes').insert(votesData);

  if (insertError) {
    console.error('Supabase Insert Error:', insertError.message);
    throw new Error(
      '投票の挿入中にエラーが発生しました: ' + insertError.message
    );
  }

  revalidatePath('/votes/champ');

  return '投票が完了しました。';
}
