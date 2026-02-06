export const useSubdomain = () => {
  const url = useRequestURL()
  const host = url.hostname

  const rawSubdomain = host.includes('.') ? host.split('.')[0] : ''
  const subdomain = rawSubdomain || 'localhost'
  const themeMap: Record<string, string> = {
    fir: 'fir',
    pfb: 'pfb',
    tf: 'tf'
  }

  const activeSubdomain = useState('activeSubdomain', () => subdomain)
  const activeTheme = useState('activeTheme', () => themeMap[subdomain] ?? 'default')

  return {
    activeSubdomain,
    activeTheme
  }
}
