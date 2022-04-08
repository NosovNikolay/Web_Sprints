const loadImage = url => new Promise(async res => {
  const img = new Image()
  img.onload = () => res(img)
  img.src = URL.createObjectURL(await (await fetch(url)).blob())
})

const getImageData = img => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const generateImageCanvas = imgData => {
  const canvas = document.createElement('canvas')
  const size = Math.min(imgData.width, imgData.height)
  const hSize = size / 2
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imgData, hSize - (imgData.width / 2), hSize - (imgData.height / 2))
  return canvas
}

const cloneImageData = imgData => new ImageData(new Uint8ClampedArray(imgData.data), imgData.width, imgData.height)

const processImageData = (imageData, processor) => {
  const imgData = cloneImageData(imageData)
  const data = imgData.data
  const len = data.length
  for (let i = 0; i < len; i += 4)
    [data[i], data[i + 1], data[i + 2], data[i + 3]] = processor([data[i], data[i + 1], data[i + 2], data[i + 3]], imageData)
  return imgData
}

imageForm.addEventListener('submit', async e => {
  e.preventDefault()
  const imgData = getImageData(await loadImage(imageLink.value))
  result.replaceChildren(
    generateImageCanvas(imgData),
    generateImageCanvas(processImageData(imgData, ([r, g, b, a]) => [r, 0, 0, a])),
    generateImageCanvas(processImageData(imgData, ([r, g, b, a]) => [0, g, 0, a])),
    generateImageCanvas(processImageData(imgData, ([r, g, b, a]) => [0, 0, b, a])),
  )
})
