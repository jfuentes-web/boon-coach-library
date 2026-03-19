export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { searchQuery } = req.body;

    const prompt = `You are a research assistant for professional coaches at Boon, a coaching company.

Search the web for 4 high-quality recent articles about: "${searchQuery}"

For each article, output it using EXACTLY this format:

ARTICLE
TITLE: the full article title here
URL: the full url here
SOURCE: publication name here
TAG: one of ai or coaching or leadership or wellbeing or skills
SUMMARY: a two sentence summary for coaches with no special characters
TAKEAWAY1: first key takeaway
TAKEAWAY2: second key takeaway
TAKEAWAY3: third key takeaway
END

Repeat the ARTICLE...END block for each article. Do not use JSON. Do not use quotes or apostrophes anywhere. Use plain text only.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    let rawText = '';
    for (const block of data.content) {
      if (block.type === 'text') rawText += block.text;
    }

    const articles = [];
    const articleBlocks = rawText.split('ARTICLE').slice(1);

    for (const block of articleBlocks) {
      const get = (field) => {
        const regex = new RegExp(field + ':\\s*(.+?)(?:\\n|$)');
        const match = block.match(regex);
        return match ? match[1].trim() : '';
      };

      const title = get('TITLE');
      const url = get('URL');
      if (!title) continue;

      articles.push({
        title,
        url,
        source: get('SOURCE'),
        tag: get('TAG') || 'ai',
        summary: get('SUMMARY'),
        takeaways: [get('TAKEAWAY1'), get('TAKEAWAY2'), get('TAKEAWAY3')].filter(Boolean)
      });
    }

    res.status(200).json({ articles });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
