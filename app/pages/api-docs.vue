<script lang="ts" setup>
definePageMeta({
  title: 'API Documentation',
  layout: 'default'
})
</script>

<template>
  <UPage class="api-docs p-4 w-full max-w-3xl mx-auto">
    <h1>ConvexHull Visualizer API — Quick Start</h1>

    <p>Short, copy-paste instructions to call the backend API that computes convex hulls.</p>

    <h2>Base URL</h2>
    <p><code>http://localhost:8080</code> (default when running the API locally)</p>

    <h2>Important Endpoints</h2>
    <ul>
      <li><code>POST /api/v1/convexhull/compute</code> — returns basic hull</li>
      <li><code>POST /api/v1/convexhull/compute-full</code> — returns detailed hull info</li>
    </ul>

    <h2>Request Format (2D)</h2>
    <p>Send JSON with an <code>input</code> array of point strings (comma-separated coordinates):</p>

    <pre><code>{
  "input": [
    "0,0",
    "2,0",
    "1,1",
    "0,2",
    "2,2"
  ]
}
    </code></pre>

    <h2>Request Format (3D)</h2>
    <pre><code>{
  "input": [
    "0,0,0",
    "2,0,0",
    "0,2,0",
    "0,0,2",
    "0,2,2",
    "2,0,2",
    "2,2,0",
    "2,2,2",
    "1,1,1"
  ]
}
    </code></pre>

    <h2>Example cURL (2D)</h2>
    <pre><code>curl -X POST "http://localhost:8080/api/v1/convexhull/compute" \
  -H "Content-Type: application/json" \
  -d '{"input":["1.0,2.0","3.0,4.0","5.0,6.0"]}'
    </code></pre>

    <h2>Minimal Example Response (2D)</h2>
    <pre><code>{
  "hull": [
    "0,0",
    "2,0",
    "2,2",
    "0,2"
  ]
}
    </code></pre>

    <h2>Detailed Response (compute-full)</h2>
    <p>The detailed endpoint returns the original input, base points, colinear points, chosen algorithm, timing and a timestamp. Example:</p>
    <pre><code>{
  "input": ["0,0","2,0","1,1","0,2","2,2"],
  "base": ["1,1"],
  "colinear": [],
  "hull": ["0,0","2,0","2,2","0,2"],
  "algorithm": "Graham Scan",
  "computationTimeMs": 1,
  "timestamp": "2024-01-01T12:00:00Z"
}
    </code></pre>

    <h2>Tips</h2>
    <ul>
      <li>Use the 2D format for planar data and 3D for spatial data.</li>
      <li>For debugging, call <code>/api/v1/convexhull/compute-full</code> to see internal classification of points.</li>
      <li>If the backend runs on a different host/port, update the Base URL accordingly.</li>
    </ul>

    <p>If you'd like, I can add example fetch/axios snippets, or wire this page into the site navigation.</p>
  </UPage>
</template>

<style>
.api-docs{min-height:100vh;overflow:auto;box-sizing:border-box;padding-bottom:48px;-ms-overflow-style:none;scrollbar-width:none}
.api-docs::-webkit-scrollbar{display:none;width:0;height:0}
.api-docs h1{font-size:1.6rem;margin-bottom:0.5rem}
.api-docs h2{margin-top:1rem;font-size:1.1rem}
.api-docs pre{background:#0f1724;color:#e6eef8;padding:12px;border-radius:6px;overflow:auto;-ms-overflow-style:none;scrollbar-width:none}
.api-docs pre::-webkit-scrollbar{display:none;width:0;height:0}
.api-docs code{font-family:monospace}
</style>
