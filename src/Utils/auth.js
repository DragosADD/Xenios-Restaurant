import supabase from '../Services/supabase';

export async function getUser() {
  const { data: token } = await supabase.auth.getSession();
  if (!token.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  console.log(data);
  if (data?.user) {
    console.log(data.user);
    return data?.user;
  } else {
    console.log(`should be null`);
    return null;
  }
}

export async function sessionLoader() {
  return await supabase.auth.getSession();
}
