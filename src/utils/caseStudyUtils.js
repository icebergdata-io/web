/**
 * Utility functions for case study management
 */

/**
 * Gets the total number of case study files by checking the cases directory
 * @returns {Promise<number>} The number of case study files
 */
export async function getCaseStudyCount() {
  try {
    // Start from 1 and keep checking until we find a missing file
    let count = 0;
    for (let i = 1; i <= 1000; i++) { // Reasonable upper limit
      try {
        const response = await fetch(`/articles/cases/${i}.json`);
        if (response.ok) {
          count = i;
        } else {
          // Found the first missing file, stop counting
          break;
        }
      } catch (error) {
        // Found the first missing file, stop counting
        break;
      }
    }
    return count;
  } catch (error) {
    console.error('Error getting case study count:', error);
    return 0;
  }
}

/**
 * Gets all case study data up to the specified count
 * @param {number} maxCount - Maximum number of case studies to fetch
 * @returns {Promise<Array>} Array of case study objects
 */
export async function getAllCaseStudies(maxCount = null) {
  try {
    const count = maxCount || await getCaseStudyCount();
    const studies = [];
    
    for (let i = 1; i <= count; i++) {
      try {
        const response = await fetch(`/articles/cases/${i}.json`);
        if (response.ok) {
          const data = await response.json();
          studies.push({ id: i, ...data });
        }
      } catch (error) {
        // Skip case studies that can't be loaded
        continue;
      }
    }
    
    return studies;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

/**
 * Finds a case study by sector and slug
 * @param {string} sector - The sector slug
 * @param {string} slug - The case study slug
 * @returns {Promise<Object|null>} The case study object or null if not found
 */
export async function findCaseStudyBySlug(sector, slug) {
  try {
    const count = await getCaseStudyCount();
    
    for (let i = 1; i <= count; i++) {
      try {
        const response = await fetch(`/articles/cases/${i}.json`);
        if (response.ok) {
          const data = await response.json();
          const { slugify } = await import('./slugify.js');
          const currentSlug = slugify(`${data.Title}-${data.Subtitle}`);
          const currentSector = slugify(data.Sector);
          
          if (currentSlug === slug && currentSector === sector) {
            return { id: i, ...data };
          }
        }
      } catch (error) {
        // Skip case studies that can't be loaded
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding case study:', error);
    return null;
  }
} 