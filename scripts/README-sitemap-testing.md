# Sitemap Testing Guide

This guide explains how to test that the sitemap generation and GitHub Actions workflow are working correctly.

## Local Testing

### Quick Test
```bash
# Test sitemap generation locally
node scripts/test-sitemap-workflow.js
```

### Manual Steps
```bash
# 1. Regenerate index and sitemap
node scripts/regenerate-index.js

# 2. Validate XML
xmllint --noout public/sitemap.xml

# 3. Check statistics
grep -c '<loc>' public/sitemap.xml  # Should be ~196
grep -c '&amp;' public/sitemap.xml  # Should be 2+ (escaped ampersands)
```

## GitHub Actions Testing

### Manual Trigger
1. Go to: https://github.com/icebergdata-io/web/actions/workflows/scheduled-index-update.yml
2. Click "Run workflow" → "Run workflow"
3. Monitor the run in the Actions tab

### What to Check
- ✅ Workflow completes successfully
- ✅ Both `index.json` and `sitemap.xml` are committed if changed
- ✅ Commit message includes both files: "🤖 Auto-update case studies index and sitemap"
- ✅ No XML validation errors in logs

## Google Search Console Verification

### After Workflow Runs
1. Go to Google Search Console → Sitemaps
2. Submit the updated sitemap: `https://www.icebergdata.co/sitemap.xml`
3. Check for:
   - ✅ No XML parsing errors
   - ✅ Correct number of URLs indexed
   - ✅ Valid lastmod dates

## Automated Testing

The workflow runs daily at 9 AM UTC, but can be tested manually as described above.

## Troubleshooting

### If XML validation fails:
```bash
# Check for unescaped characters
grep '&' public/sitemap.xml | grep -v '&amp;'
```

### If files aren't committed:
- Check that both files are detected as changed
- Verify the git add command includes both files

### If Google still reports errors:
- Run the local test script
- Manually submit sitemap to GSC
- Check the sitemap URL directly in browser
