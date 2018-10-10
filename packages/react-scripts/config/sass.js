const date = new Date(); // get timestamp on build-time
const fz = n => (n < 10 ? '0' + n : n);

const timestamp = () =>
  `${date.getYear() - 100}${fz(date.getMonth() + 1)}${fz(date.getDate())}${fz(
    date.getHours()
  )}${fz(date.getMinutes())}`;

const data = staticPath => {
  const resolveStaticPath =
    staticPath.startsWith('.') ||
    !(staticPath.startsWith('http') && staticPath.startsWith('/'))
      ? `/${staticPath}`
      : staticPath;

  return `
    $static-path: "${process.env.BASENAME || ''}${resolveStaticPath}";
    $timestamp: "${timestamp()}";
  `.trim();
};

module.exports = {
  timestamp,
  data,
};
