import { SOCIAL } from '@/lib/site';
import { SocialIcon } from './Icons';

/** Personal social profiles (@zubairakbarpk) as round icon links */
export default function Socials({ size = 20 }: { size?: number }) {
  return (
    <div className="socials">
      {SOCIAL.map((s) => (
        <a
          key={s.key}
          className="social"
          href={s.href}
          aria-label={`Zubair Akbar on ${s.label}`}
          target="_blank"
          rel="noopener noreferrer me"
        >
          <SocialIcon name={s.key} size={size} />
        </a>
      ))}
    </div>
  );
}
