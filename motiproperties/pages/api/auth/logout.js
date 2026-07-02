export default async function handler(req, res) {
    // Overwrite cookie with empty value and expired max age
  res.setHeader('Set-Cookie', 'user=; Path=/; Max-Age=0');
  res.redirect('/');
}
