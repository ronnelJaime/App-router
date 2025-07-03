    import { generateYAxis } from '@/app/lib/utils';
    import { CalendarIcon } from '@heroicons/react/24/outline';
    import { lusitana } from '@/app/ui/fonts';
    import { fetchRevenue } from '@/app/lib/data';

    export default async function RevenueChart() {
      const revenue = await fetchRevenue();

      const chartHeight = 350;
      if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
      }

      const { yAxisLabels, topLabel } = generateYAxis(revenue);

      return (
        <div className="w-full md:col-span-4">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Recent Revenue
          </h2>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="mt-0 flex h-[410px] items-end rounded-md bg-white p-4">
              
              <div className="mb-6 hidden flex-col justify-between text-xs text-gray-400 sm:flex pr-2">
               
                {yAxisLabels.map((label) => (
                  <p key={label}>{label}</p> 
                ))}
              </div>
              <div className="grid grid-cols-12 gap-2 md:gap-4 flex-grow">
                {revenue.map((month) => (
                  <div key={month.month} className="flex flex-col items-center gap-2 justify-end"> 
                    <div
                      className="w-full rounded-md bg-blue-300"
                      style={{
                        height: `${(month.revenue / topLabel) * chartHeight}px`,
                      }}
                    ></div>
                    <p className="text-sm text-gray-400">
                      {month.month}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center pb-2 pt-6">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
            </div>
          </div>
        </div>
      );
    }
    