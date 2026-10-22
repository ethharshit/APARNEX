export function BrandLogo({className = '', priority = false}: {className?: string; priority?: boolean}) {
  return <img className={className} src="/aparnex-logo-display.webp" alt="APARNEX PHARMA LLP" width={1472} height={432} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/>;
}
