    'use client';

    import { useState, useEffect } from 'react';
    import { usePathname, useSearchParams } from 'next/navigation';

    import '@/app/ui/segmented-loading-bar.css';

    const NUM_SEGMENTS = 5; 
    const SEGMENT_ANIMATION_DELAY = 100; 
    const LOADING_DURATION = 1500; 

    export default function SegmentedLoadingBar() {
      const pathname = usePathname();
      const searchParams = useSearchParams();
      const [visibleSegments, setVisibleSegments] = useState(0);
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
       
        setIsLoading(true);
        setVisibleSegments(0); 
    
        let segmentInterval;
        let loadingTimeout;

        segmentInterval = setInterval(() => {
          setVisibleSegments(prev => {
            if (prev < NUM_SEGMENTS) {
              return prev + 1;
            }
            clearInterval(segmentInterval); 
            return prev;
          });
        }, SEGMENT_ANIMATION_DELAY);

        loadingTimeout = setTimeout(() => {
          setIsLoading(false);
          setVisibleSegments(0); 
          clearInterval(segmentInterval); 
        }, LOADING_DURATION);

        return () => {
          clearInterval(segmentInterval);
          clearTimeout(loadingTimeout);
          setIsLoading(false); 
          setVisibleSegments(0);
        };
      }, [pathname, searchParams]);

      if (!isLoading) {
        return null; 
      }

      return (
        <div className="segmented-loading-bar-container">
          {Array.from({ length: NUM_SEGMENTS }).map((_, index) => (
            <div
              key={index}
              className={`segmented-loading-bar-segment ${
                index < visibleSegments ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: `${index * SEGMENT_ANIMATION_DELAY}ms` }}
            ></div>
          ))}
        </div>
      );
    }
    