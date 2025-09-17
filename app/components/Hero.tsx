import clsx from 'clsx';
import {MediaFile} from '@shopify/hydrogen';
import type {MediaImage, Media, Video as MediaVideo} from '@shopify/hydrogen/storefront-api-types';
import type {CollectionContentFragment} from 'storefrontapi.generated';
import {Heading, Text} from '~/components/Text';
import {Link} from '~/components/Link';

type HeroProps = CollectionContentFragment & {
  height?: 'full';
  top?: boolean;
  loading?: HTMLImageElement['loading'];
};

/**
 * Hero component with improved visuals and CTA button
 **/
export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}: HeroProps) {
  return (
    <Link to={`/collections/${handle}`} prefetch="viewport">
      <section
        className={clsx(
          'relative flex flex-col justify-end w-full overflow-hidden',
          top && '-mt-nav',
          height === 'full'
            ? 'h-screen'
            : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]'
        )}
      >
        {/* Background Media */}
        <div className="absolute inset-0 grid flex-grow grid-flow-col auto-cols-fr pointer-events-none -z-10 overflow-clip content-stretch">
          {spread?.reference && (
            <div>
              <SpreadMedia
                sizes={
                  spreadSecondary?.reference
                    ? '(min-width: 48em) 50vw, 100vw'
                    : '100vw'
                }
                data={spread.reference as Media}
                loading={loading}
              />
            </div>
          )}
          {spreadSecondary?.reference && (
            <div className="hidden sm:block md:block">
              <SpreadMedia
                sizes="50vw"
                data={spreadSecondary.reference as Media}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Text & CTA */}
        <div className="flex flex-col items-start justify-center gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t from-primary/60 to-transparent text-contrast dark:from-contrast/60 dark:to-transparent dark:text-primary">
          {heading?.value && (
            <Heading format as="h2" size="display" className="max-w-md text-shadow-md">
              {heading.value}
            </Heading>
          )}
          {byline?.value && (
            <Text format width="narrow" as="p" size="lead">
              {byline.value}
            </Text>
          )}
          {cta?.value && (
            <Link
              to={`/collections/${handle}`}
              className="inline-block px-6 py-3 mt-2 font-semibold text-contrast bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              {cta.value}
            </Link>
          )}
        </div>
      </section>
    </Link>
  );
}

type SpreadMediaProps = {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
};

function SpreadMedia({data, loading, sizes}: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: {src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || 'Hero image',
        },
      }}
    />
  );
}