#!/bin/bash

# Add a link to frameworks at the end of the programs section
sed -i '' '/<\/div><!-- programs-section -->/i\
  <div style="text-align: center; padding: 40px; background: #EFF0F1; margin-top: 60px;">\
    <h3 style="font-size: 24px; color: #3A57A7; margin-bottom: 16px; font-family: PT Sans;">Ready to dive deeper?</h3>\
    <p style="color: #4A4A6A; margin-bottom: 24px; font-family: PT Sans;">Explore all coaching frameworks, protocols, and resources.</p>\
    <a href="frameworks.html" style="background: #466FF6; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-family: PT Sans; font-weight: 600; display: inline-block;">View All Frameworks →</a>\
  </div>\
' index.html

echo "✅ Framework link added to index.html"
