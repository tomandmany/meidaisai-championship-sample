// @/actions/insertVote.ts
'use server';

import { getVotesHistory } from '@/data/getVotesHistory';
import getJSTDate from '@/lib/getJSTDate';
import { supabase } from '@/lib/supabaseClient';
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

  const today = getCurrentDateString(testDate);

  await ensureUserExists(user_id, today);

  const votesHistory = await getVotesHistory(user_id);

  programs.map((program) => {
    validateProgramVote(program, votesHistory, today);
  });

  const votesData = createVotesData(user_id, programs, today);

  await insertVotes(votesData);

  revalidatePath('/votes/champ');

  return '投票が完了しました。';
}

function getCurrentDateString(testDate?: Date): string {
  return (testDate ? getJSTDate(testDate) : getJSTDate()).split('T')[0];
}

async function ensureUserExists(user_id: string, createdAt: string) {
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
      created_at: createdAt,
    });

    if (insertUserError) {
      console.error('ユーザー追加エラー:', insertUserError.message);
      throw new Error('新しいユーザーの追加中にエラーが発生しました');
    }
    console.log('新しいユーザーが追加されました:', user_id);
  }
}

function validateProgramVote(
  program: { id: string; title: string; date: string },
  votesHistory: { program_id: string; created_at: string }[],
  today: string
) {
  if (!program.date) {
    console.error('投票したい企画に日付が指定されていません:', program);
    throw new Error('投票したい企画に日付が指定されていません');
  }

  if (program.date === '全日') {
    const isAlreadyVoted = (programId: string) =>
      votesHistory.some((vote) => {
        const voteDate = getJSTDate(new Date(vote.created_at)).split('T')[0];
        return vote.program_id === programId && voteDate === today;
      });

    if (isAlreadyVoted(program.id)) {
      console.error('すでに投票済みです:', program, today);
      throw new Error(`すでに投票済みです: ${program.title} (${today})`);
    }
  } else if (['2日', '3日', '4日'].includes(program.date)) {
    if (votesHistory.some((vote) => vote.program_id === program.id)) {
      console.error('すでに投票済みです:', program);
      throw new Error(`すでに投票済みです: ${program.title}`);
    }
  }
}

function createVotesData(
  user_id: string,
  programs: { id: string; title: string; department: string }[],
  createdAt: string
) {
  return programs.map((program) => ({
    user_id,
    created_at: createdAt,
    department: program.department,
    program_id: program.id,
    program_name: program.title,
  }));
}

async function insertVotes(votesData: any[]) {
  const { error: insertError } = await supabase.from('votes').insert(votesData);

  if (insertError) {
    console.error('Supabase Insert Error:', insertError.message);
    throw new Error(
      '投票の挿入中にエラーが発生しました: ' + insertError.message
    );
  }
}
