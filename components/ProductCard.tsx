import { type Product, logoFor, ownerName, productSocial } from '@/lib/site';
import { SocialIcon } from './Icons';

const statusClass = { Live: 'status--live', 'Pre-launch': 'status--pre', 'Coming soon': 'status--soon' } as const;

export default function ProductCard({ p, headingLevel = 3 }: { p: Product; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const s = productSocial(p);
  return (
    <article className="card card--line card--hover p-card">
      <div className="p-card__top">
        <span className={`logo-tile${p.status === 'Coming soon' ? ' logo-tile--soon' : ''}`} style={{ width: 56, height: 56 }}>
          <img src={logoFor(p.name)} alt={`${p.name} logo`} width={40} height={40} loading="lazy" />
        </span>
        <span className={`status ${statusClass[p.status]}`}>{p.status}</span>
      </div>
      <p className="p-card__tag">{p.tag}</p>
      <H>{p.name}</H>
      <p className="p-card__desc">{p.description}</p>
      <p className="p-card__owner">By <strong>{ownerName(p.owner)}</strong></p>
      <div className="p-card__foot">
        <a className="link-arrow" href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">{p.domain} →</a>
        <div className="p-card__links">
          {(['linkedin', 'facebook', 'instagram', 'x', 'youtube'] as const).map((k) =>
            s[k] ? (
              <a key={k} className="social social--sm social--line" href={s[k]} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on ${k === 'x' ? 'X' : k[0].toUpperCase() + k.slice(1)}`}>
                <SocialIcon name={k} size={15} />
              </a>
            ) : null,
          )}
        </div>
      </div>
    </article>
  );
}
