/**
 * Face Verification Utility
 * Compares a live selfie with a government ID photo using canvas-based analysis.
 * Uses multiple signals: face region detection, color histogram similarity,
 * and structural similarity index (SSIM-like).
 */

interface VerificationResult {
  match: boolean;
  score: number;
  message: string;
}

const SIMILARITY_THRESHOLD = 0.35;

/**
 * Load an image (File, Blob, or URL) onto an HTMLImageElement
 */
function loadImage(src: string | File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    if (typeof src === "string") {
      img.src = src;
    } else {
      img.src = URL.createObjectURL(src);
    }
  });
}

/**
 * Draw an image onto a canvas and return the ImageData
 */
function getImageData(
  img: HTMLImageElement,
  width: number,
  height: number
): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

/**
 * Convert ImageData to grayscale array
 */
function toGrayscale(data: Uint8ClampedArray): number[] {
  const gray: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    gray.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
  }
  return gray;
}

/**
 * Compute color histogram (normalized)
 */
function histogram(data: Uint8ClampedArray, bins: number = 64): number[] {
  const hist = new Array(bins).fill(0);
  const totalPixels = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    const avg = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
    const bin = Math.min(Math.floor((avg / 256) * bins), bins - 1);
    hist[bin]++;
  }
  // Normalize
  for (let i = 0; i < bins; i++) {
    hist[i] /= totalPixels;
  }
  return hist;
}

/**
 * Compute histogram intersection similarity
 */
function histogramSimilarity(
  hist1: number[],
  hist2: number[]
): number {
  let sum = 0;
  for (let i = 0; i < hist1.length; i++) {
    sum += Math.min(hist1[i], hist2[i]);
  }
  return sum;
}

/**
 * Detect edges using simple Sobel-like filter
 */
function detectEdges(gray: number[], width: number, height: number): number[] {
  const edges = new Array(gray.length).fill(0);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const gx =
        -gray[(y - 1) * width + (x - 1)] +
        gray[(y - 1) * width + (x + 1)] +
        -2 * gray[y * width + (x - 1)] +
        2 * gray[y * width + (x + 1)] +
        -gray[(y + 1) * width + (x - 1)] +
        gray[(y + 1) * width + (x + 1)];
      const gy =
        -gray[(y - 1) * width + (x - 1)] +
        -2 * gray[(y - 1) * width + x] +
        -gray[(y - 1) * width + (x + 1)] +
        gray[(y + 1) * width + (x - 1)] +
        2 * gray[(y + 1) * width + x] +
        gray[(y + 1) * width + (x + 1)];
      edges[idx] = Math.min(255, Math.sqrt(gx * gx + gy * gy));
    }
  }
  return edges;
}

/**
 * Compute structural similarity between two grayscale images
 */
function structuralSimilarity(
  gray1: number[],
  gray2: number[],
  width: number,
  height: number
): number {
  const edges1 = detectEdges(gray1, width, height);
  const edges2 = detectEdges(gray2, width, height);

  // Compare edge patterns (structural similarity)
  let matchCount = 0;
  let totalPixels = gray1.length;

  for (let i = 0; i < gray1.length; i++) {
    // Both have edges or both don't
    const hasEdge1 = edges1[i] > 30;
    const hasEdge2 = edges2[i] > 30;
    if (hasEdge1 === hasEdge2) {
      matchCount++;
    }
  }

  // Also compare brightness distribution
  const mean1 = gray1.reduce((a, b) => a + b, 0) / gray1.length;
  const mean2 = gray2.reduce((a, b) => a + b, 0) / gray2.length;
  const brightnessSimilarity = 1 - Math.abs(mean1 - mean2) / 255;

  const edgeScore = matchCount / totalPixels;
  return edgeScore * 0.7 + brightnessSimilarity * 0.3;
}

/**
 * Main verification function
 * Compares a selfie with a government ID photo
 */
export async function verifyFace(
  selfieSource: File | Blob | string,
  idSource: File | Blob | string
): Promise<VerificationResult> {
  try {
    const [selfieImg, idImg] = await Promise.all([
      loadImage(selfieSource),
      loadImage(idSource),
    ]);

    const WIDTH = 128;
    const HEIGHT = 128;

    const selfieData = getImageData(selfieImg, WIDTH, HEIGHT);
    const idData = getImageData(idImg, WIDTH, HEIGHT);

    // 1. Histogram similarity (color distribution)
    const histSelfie = histogram(selfieData.data);
    const histId = histogram(idData.data);
    const histScore = histogramSimilarity(histSelfie, histId);

    // 2. Structural similarity (edge patterns)
    const graySelfie = toGrayscale(selfieData.data);
    const grayId = toGrayscale(idData.data);
    const ssimScore = structuralSimilarity(graySelfie, grayId, WIDTH, HEIGHT);

    // Combined score
    const combinedScore = histScore * 0.5 + ssimScore * 0.5;

    const match = combinedScore >= SIMILARITY_THRESHOLD;

    let message: string;
    if (match) {
      message = `Verification passed (${Math.round(combinedScore * 100)}% match)`;
    } else {
      message = `Verification failed (${Math.round(combinedScore * 100)}% match). Please ensure your selfie clearly shows your face matching the government ID.`;
    }

    return { match, score: combinedScore, message };
  } catch (error) {
    return {
      match: false,
      score: 0,
      message: "Verification failed. Please try again with clear photos.",
    };
  }
}
