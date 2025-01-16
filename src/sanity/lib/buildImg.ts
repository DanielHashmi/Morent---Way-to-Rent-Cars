import client from '../lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

const builder = imageUrlBuilder(client)

export default function buildImg(source: Parameters<ImageUrlBuilder['image']>[0]) {
    return builder.image(source)
}
