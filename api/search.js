export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { searchQuery } = req.body;

    const prompt = `You are a research assistant for professional coaches at Boon.
Search the web for 4 recent articles about: ${searchQuery}

For each article output EXACTLY this block format with no deviations:

ARTICLE
TITLE: article title here
URL: full url here
SOURCE: publication name
TAG: ai
SUMMARY: two sentence summary here no apostrophes
TAKEAWAY1: first takeaway here
TAKEAWAY2: second takeaway here
TAKEAWAY3: third takeaway here
END

Output only these blocks. No JSON. No quotes. No apostrophes. No colons inside values.`;

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
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

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data.error?.message || 'API error' });
    }

    let rawText = '';
    for (const block of data.content) {
      if (block.type === 'text') rawText += block.text;
    }

    const articles = [];
    const blocks = rawText.split('ARTICLE').slice(1);

    for (const block of blocks) {
      const get = (field) => {
        const match = block.match(new RegExp(field + ':\\s*(.+?)(?:\\n|$)'));
        if (!match) return '';
        return match[1].trim()
          .replace(/'/g, '')
          .replace(/"/g, '')
          .replace(/`/g, '')
          .replace(/\\/g, '');
      };
      const title = get('TITLE');
      if (!title) continue;
      articles.push({
        title,
        url: get('URL'),
        source: get('SOURCE'),
        tag: get('TAG') || 'ai',
        summary: get('SUMMARY'),
        takeaways: [get('TAKEAWAY1'), get('TAKEAWAY2'), get('TAKEAWAY3')].filter(Boolean)
      });
    }

    return res.status(200).json({ articles });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
