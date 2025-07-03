    // app/ui/segmented-loading-bar.jsx
    // This component creates a custom loading bar with segments appearing one after another.

    'use client';

    import { useState, useEffect } from 'react';
    import { usePathname, useSearchParams } from 'next/navigation';

    // Import custom CSS for the segmented loading bar
    import '@/app/ui/segmented-loading-bar.css';

    const NUM_SEGMENTS = 5; // Number of segments in the loading bar
    const SEGMENT_ANIMATION_DELAY = 100; // Delay between each segment appearing (ms)
    const LOADING_DURATION = 1500; // Total simulated loading duration (ms)

    export default function SegmentedLoadingBar() {
      const pathname = usePathname();
      const searchParams = useSearchParams();
      const [visibleSegments, setVisibleSegments] = useState(0);
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        // This effect runs whenever the route changes
        setIsLoading(true);
        setVisibleSegments(0); // Reset segments on new navigation

        // Simulate segments appearing one after another
        let segmentInterval;
        let loadingTimeout;

        // Start showing segments sequentially
        segmentInterval = setInterval(() => {
          setVisibleSegments(prev => {
            if (prev < NUM_SEGMENTS) {
              return prev + 1;
            }
            clearInterval(segmentInterval); // Stop increasing once all are visible
            return prev;
          });
        }, SEGMENT_ANIMATION_DELAY);

        // Simulate the completion of loading after a total duration
        // In a real app, this would be tied to actual data fetching completion
        loadingTimeout = setTimeout(() => {
          setIsLoading(false);
          setVisibleSegments(0); // Hide all segments
          clearInterval(segmentInterval); // Ensure interval is cleared
        }, LOADING_DURATION);

        // Cleanup function: Clear intervals and timeouts if component unmounts or effect re-runs
        return () => {
          clearInterval(segmentInterval);
          clearTimeout(loadingTimeout);
          setIsLoading(false); // Ensure loader is hidden on cleanup
          setVisibleSegments(0);
        };
      }, [pathname, searchParams]); // Re-run effect on route changes

      if (!isLoading) {
        return null; // Don't render anything if not loading
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
    