# Google Cloud Vision API Integration

**Status:** Active | **API Key:** Configured

---

## Setup

API Key: `AIzaSyCeDF2Yfgg8P4Y5e1PhctdKiNE9C4v1YMI`

Base URL: `https://vision.googleapis.com/v1/images:annotate`

---

## Features

### 1. OCR (Text Detection)
```javascript
async function detectText(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'TEXT_DETECTION' }]
      }]
    })
  });
  
  const data = await response.json();
  return data.responses[0].fullTextAnnotation?.text;
}
```

### 2. Object Detection
```javascript
async function detectObjects(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'OBJECT_LOCALIZATION', maxResults: 10 }]
      }]
    })
  });
  
  return data.responses[0].localizedObjectAnnotations;
}
```

### 3. Image Labeling
```javascript
async function labelImage(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
      }]
    })
  });
  
  return data.responses[0].labelAnnotations;
}
```

### 4. Face Detection
```javascript
async function detectFaces(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'FACE_DETECTION' }]
      }]
    })
  });
  
  return data.responses[0].faceAnnotations;
}
```

### 5. Landmark Detection
```javascript
async function detectLandmarks(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'LANDMARK_DETECTION', maxResults: 5 }]
      }]
    })
  });
  
  return data.responses[0].landmarkAnnotations;
}
```

### 6. Safe Search
```javascript
async function safeSearch(imageBase64) {
  const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [{
        image: { content: imageBase64 },
        features: [{ type: 'SAFE_SEARCH_DETECTION' }]
      }]
    })
  });
  
  return data.responses[0].safeSearchAnnotation;
}
```

---

## Helper: Convert Image to Base64

```javascript
function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });
}

// Or from URL (via proxy)
async function urlToBase64(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return imageToBase64(blob);
}
```

---

## Use Cases

| Feature | Use Case |
|---------|----------|
| OCR | Extract text from menus, documents, signs |
| Object Detection | Identify products, ingredients |
| Labeling | Auto-tag images for galleries |
| Face Detection | Portrait effects, privacy blur |
| Landmarks | Travel apps, location tagging |
| Safe Search | Content moderation |

---

## Pricing

- First 1000 units/month: **Free**
- 1000+ units: $1.50 per 1000 units

---

## Security Note

⚠️ **Never expose API key in client-side code for production**
- Use environment variables
- Route through your backend
- Restrict key by HTTP referrer
- Set usage quotas
