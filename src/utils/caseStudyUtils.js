/**
 * Utility functions for case study management
 */

/**
 * Gets the case study index data
 * @returns {Promise<Object>} The case study index
 */
async function getCaseStudyIndex() {
  try {
    const response = await fetch('/articles/cases/index.json');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to load case study index');
  } catch (error) {
    console.error('Error loading case study index:', error);
    return { total: 0, caseStudies: [] };
  }
}

/**
 * Gets the total number of case study files
 * @returns {Promise<number>} The number of case study files
 */
export async function getCaseStudyCount() {
  try {
    const index = await getCaseStudyIndex();
    return index.total;
  } catch (error) {
    console.error('Error getting case study count:', error);
    return 0;
  }
}

/**
 * Gets all case study data
 * @returns {Promise<Array>} Array of case study objects
 */
export async function getAllCaseStudies() {
  try {
    const index = await getCaseStudyIndex();
    const studies = [];
    
    for (const caseStudy of index.caseStudies) {
      try {
        const response = await fetch(`/articles/cases/${caseStudy.id}.json`);
        if (response.ok) {
          const data = await response.json();
          studies.push({ id: caseStudy.id, ...data });
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
    const index = await getCaseStudyIndex();
    
    for (const caseStudy of index.caseStudies) {
      if (caseStudy.sector === sector && caseStudy.slug === slug) {
        try {
          const response = await fetch(`/articles/cases/${caseStudy.id}.json`);
          if (response.ok) {
            const data = await response.json();
            return { id: caseStudy.id, ...data };
          }
        } catch (error) {
          // Skip case studies that can't be loaded
          continue;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding case study:', error);
    return null;
  }
} 