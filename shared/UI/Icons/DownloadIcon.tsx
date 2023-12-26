export default function DownloadFacade({ color }: { color: string }) {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 0V10.75M6 10.75L1.5 6.25M6 10.75L10.5 6.25M1 12.5H11"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
