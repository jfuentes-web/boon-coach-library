#!/bin/bash

# Add navigation menu after the opening <body> tag in frameworks.html
sed -i '' '/<body/a\
<nav style="background: #466FF6; padding: 12px 24px; display: flex; gap: 24px; position: sticky; top: 0; z-index: 99;">\
  <a href="index.html" style="color: white; text-decoration: none; font-family: PT Sans; font-size: 14px; font-weight: 500;">← Back to Programs</a>\
</nav>\
' frameworks.html

echo "✅ Navigation added to frameworks.html"
