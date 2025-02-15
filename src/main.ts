import { init as csRenderInit, Enums, RenderingEngine } from '@cornerstonejs/core';
import {
    volumeLoader, Types, cornerstoneStreamingImageVolumeLoader, cornerstoneStreamingDynamicImageVolumeLoader, imageLoader
} from '@cornerstonejs/core';
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import { generateImageIDs } from './imageIDs';

let maxWebWorkers = 1;
cornerstoneDICOMImageLoader.init({
    maxWebWorkers: maxWebWorkers,
});

if (navigator.hardwareConcurrency) {
    maxWebWorkers = Math.min(navigator.hardwareConcurrency, 7);
}

volumeLoader.registerUnknownVolumeLoader(
    cornerstoneStreamingImageVolumeLoader as unknown as Types.VolumeLoaderFn
);
volumeLoader.registerVolumeLoader(
    'cornerstoneStreamingImageVolume',
    cornerstoneStreamingImageVolumeLoader as unknown as Types.VolumeLoaderFn
);
volumeLoader.registerVolumeLoader(
    'cornerstoneStreamingDynamicImageVolume',
    cornerstoneStreamingDynamicImageVolumeLoader as unknown as Types.VolumeLoaderFn
);
await csRenderInit();

const vpElement = document.getElementById("viewport") as HTMLDivElement
const re = new RenderingEngine("re")

re.enableElement({
    element: vpElement,
    viewportId: "viewport",
    type: Enums.ViewportType.ORTHOGRAPHIC
})

const imageIDs = generateImageIDs()

const volume = await volumeLoader.createAndCacheVolume("volume", {
    imageIds: imageIDs,
});

imageLoader.loadAndCacheImages(imageIDs)

volume.load()

const vps = re.getVolumeViewports()
vps[0].setVolumes([{volumeId: "volume"}])