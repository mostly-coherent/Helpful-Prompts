// Extract all internal links from the current page
// Used in Step 5: Extract Embedded Links

async () => {
  const links = Array.from(document.querySelectorAll('a[href]'));
  const linkData = [];
  const currentHostname = window.location.hostname;
  
  for (const link of links) {
    const href = link.href;
    const text = link.textContent.trim();
    
    if (!href) continue;
    
    // Normalize the URL
    let normalizedUrl = href;
    if (href.startsWith('/')) {
      normalizedUrl = `${window.location.protocol}//${currentHostname}${href}`;
    }
    
    // Check if it's an internal link (same domain)
    try {
      const urlObj = new URL(normalizedUrl);
      const isInternal = urlObj.hostname === currentHostname || 
                        urlObj.hostname.endsWith('.' + currentHostname) ||
                        (href.startsWith('/') && !href.startsWith('//'));
      
      const isFileDownload = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|txt|csv)$/i.test(href);
      
      const isContentPage = href.endsWith('.html') || 
                           href.includes('/content/') || 
                           href.includes('/help/') ||
                           (!href.includes('#') && !href.startsWith('javascript:') && !href.startsWith('mailto:'));
      
      const isValidContentLink = isInternal && 
                                 !href.startsWith('#') &&
                                 !href.startsWith('javascript:') &&
                                 !href.startsWith('mailto:') &&
                                 !href.startsWith('tel:') &&
                                 (isContentPage || isFileDownload);
      
      if (isValidContentLink) {
        linkData.push({
          href: normalizedUrl,
          text: text,
          isInternal: true,
          isFileDownload: isFileDownload,
          fileType: isFileDownload ? href.match(/\.([^.]+)$/i)?.[1] : null,
          originalHref: href
        });
      }
    } catch (e) {
      continue;
    }
  }
  
  // Remove duplicates
  const uniqueLinks = [];
  const seenUrls = new Set();
  for (const link of linkData) {
    const urlWithoutHash = link.href.split('#')[0];
    if (!seenUrls.has(urlWithoutHash)) {
      seenUrls.add(urlWithoutHash);
      uniqueLinks.push({...link, href: urlWithoutHash});
    }
  }
  
  return uniqueLinks;
}
