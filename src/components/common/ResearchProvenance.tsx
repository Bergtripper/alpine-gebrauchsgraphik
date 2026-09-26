import React from 'react';
import { Work } from '../../types/atlas';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface ResearchProvenanceProps {
  work: Work;
  compact?: boolean;
}

const labelClass =
  'text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400';
const valueClass =
  'text-xs font-mono font-semibold text-stone-900 dark:text-stone-100';

export const ResearchProvenance: React.FC<ResearchProvenanceProps> = ({
  work,
  compact = false,
}) => {
  const image = work.images?.[0];
  const hasV2Data = Boolean(work.attribution || work.date || image || work.claims?.length);

  if (!hasV2Data) return null;

  const evidenceKinds = Array.from(
    new Set((work.claims || []).map((claim) => claim.evidenceKind))
  );

  return (
    <section className="border border-stone-200 dark:border-stone-800 rounded bg-stone-50 dark:bg-stone-900/60 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <ShieldCheck size={13} className="text-emerald-700 dark:text-emerald-400" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-700 dark:text-stone-200">
            Research Provenance
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Source-backed record
        </span>
      </div>

      <div className={compact ? 'p-3 space-y-2' : 'p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3'}>
        {work.attribution && (
          <div>
            <div className={labelClass}>Attribution</div>
            <div className={valueClass}>
              {work.attribution.creatorName} · {work.attribution.status}
            </div>
            {!compact && work.attribution.evidence && (
              <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-400">
                {work.attribution.evidence}
              </p>
            )}
          </div>
        )}

        {work.date && (
          <div>
            <div className={labelClass}>Date precision</div>
            <div className={valueClass}>
              {work.date.display} · {work.date.precision.toUpperCase()} · {work.date.status}
            </div>
          </div>
        )}

        {image?.catalogueId && (
          <div>
            <div className={labelClass}>Catalogue / NCTN</div>
            <div className={valueClass}>{image.catalogueId}</div>
          </div>
        )}

        {image?.inventoryId && (
          <div>
            <div className={labelClass}>Inventory</div>
            <div className={valueClass}>{image.inventoryId}</div>
          </div>
        )}

        {image?.institution && (
          <div>
            <div className={labelClass}>Institution</div>
            <div className={valueClass}>{image.institution}</div>
          </div>
        )}

        {evidenceKinds.length > 0 && (
          <div>
            <div className={labelClass}>Evidence layer</div>
            <div className={valueClass}>{evidenceKinds.join(' · ')}</div>
          </div>
        )}

        {!compact && image?.metadataRights && (
          <div>
            <div className={labelClass}>Metadata rights</div>
            <div className={valueClass}>{image.metadataRights}</div>
          </div>
        )}

        {image?.usageStatus && (
          <div>
            <div className={labelClass}>Image usage</div>
            <div className={`text-xs font-mono font-semibold ${
              image.usageStatus === 'REUSABLE'
                ? 'text-emerald-700 dark:text-emerald-400'
                : image.usageStatus === 'PERMISSION_REQUIRED'
                  ? 'text-amber-700 dark:text-amber-400'
                  : 'text-stone-700 dark:text-stone-300'
            }`}>
              {image.usageStatus.replaceAll('_', ' ')}
            </div>
          </div>
        )}

        {!compact && image?.imageRights && (
          <div>
            <div className={labelClass}>Image rights</div>
            <div className="text-[11px] text-stone-700 dark:text-stone-300">
              {image.imageRights}
            </div>
          </div>
        )}
      </div>

      {(image?.cataloguePageUrl || work.source.url) && (
        <div className="px-3 py-2 border-t border-stone-200 dark:border-stone-800">
          <a
            href={image?.cataloguePageUrl || work.source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-amber-400 hover:underline"
          >
            Open institutional catalogue
            <ExternalLink size={11} />
          </a>
        </div>
      )}
    </section>
  );
};
