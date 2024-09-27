<script lang="ts">
  import { timePeriod } from "./../../../stores/insightStore.ts";
  import { onMount } from "svelte";
  import {
    getAdsetInsights,
    getAdsetInsightsData,
    getAdsetInsightsPrevious,
    GetNewfollowers,
    GetNewFollows,
    GetPageunlikesandunfollows,
    GrowthPageandProfile,
    page_fan_adds,
  } from "../../../services/NewFacebook/Insights_service";
  import CampaignEngagements from "./CampaignEngagements.svelte";
  import Conversion from "./Conversion.svelte";
  import FollowersGrowthCard from "./FollowersGrowthCard.svelte";
  import Growth from "./Growth.svelte";
  import Reach from "./Reach.svelte";
  import SpendCosts from "./SpendCosts.svelte";

  let averageSpend = 0;
  let dailySpend = 0;
  let averageCPC = 0;
  let averageCPM = 0;
  let averageCTR = 0;
  let weeklySpend = 0;
  let Details: any;
  let metricsDifference: any = {};
  let reachData: any = [];
  let currentaverageReach = 0;
  let currentaverageImpression = 0;
  let previousaverageReach = 0;
  let previousaverageImpression = 0;
  let differenceReach = 0;
  let differenceImpression = 0;
  let totalReach = 0;
  let totalImpression = 0;

  let impressionData: any = [];

  const fetchInsights = async () => {
    try {
      const insightsCurrentData = await getAdsetInsights($timePeriod);
      const insightPreviousDate = await getAdsetInsightsPrevious($timePeriod);

      const allData = calculateMetrics(
        insightsCurrentData,
        insightPreviousDate
      );
      Details = allData;
      metricsDifference = getMetricsDifference(
        Details.current,
        Details.previous
      );

      const currentMonthData = filterMonthData(insightsCurrentData, 0);
      const prevMonthData = filterMonthData(insightPreviousDate, 1);

      averageCPC = calculateAverage(currentMonthData, "cpc");
      averageCTR = calculateAverage(currentMonthData, "ctr");
      currentaverageReach = calculateAverage(currentMonthData, "reach");
      currentaverageImpression = calculateAverage(
        currentMonthData,
        "impressions"
      );

      previousaverageReach = calculateAverage(prevMonthData, "reach");
      previousaverageImpression = calculateAverage(
        prevMonthData,
        "impressions"
      );
      differenceReach = calculatePercentageDifference(
        currentaverageReach,
        previousaverageReach
      );
      differenceImpression = calculatePercentageDifference(
        currentaverageImpression,
        previousaverageImpression
      );
      totalReach = calculateTotal(currentMonthData, "reach");
      totalImpression = calculateTotal(currentMonthData, "impressions");

      reachData = insightsCurrentData.map((item: any) => item.reach);
      impressionData = insightsCurrentData.map((item: any) => item.impressions);

      console.log("impressionData", impressionData);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const conversionActionTypes = [
    "page_engagement",
    "video_view",
    "like",
    "comment",
    "post_reaction",
    "link_click",
    "post",
    "post_engagement",
    "offsite_conversion",
    "landing_page_view",
    "lead",
    "app_install",
    "purchase",
    "add_to_cart",
    "add_to_wishlist",
    "complete_registration",
    "view_content",
    "initiate_checkout",
    "search",
    "contact",
    "custom_event_type",
  ];

  function calculateMetrics(currentData: any, previousData: any) {
    const calculateMetricsForData = (data: any) => {
      let totalClicks = 0;
      let totalSpend = 0;
      let totalConversions = 0;
      let conversionRate = 0;
      let costPerConversion = 0;

      data.forEach((adSet: any) => {
        if (adSet.actions) {
          const conversionActions = adSet.actions.filter((action: any) =>
            conversionActionTypes.includes(action.action_type)
          );
          const conversionsCount = conversionActions.reduce(
            (total: number, action: { value: string }) =>
              total + parseInt(action.value, 10),
            0
          );
          totalConversions += conversionsCount;
        }

        if (adSet.clicks) {
          totalClicks += parseInt(adSet.clicks, 10);
        }

        if (adSet.spend) {
          totalSpend += parseFloat(adSet.spend);
        }
      });

      if (totalClicks > 0) {
        conversionRate = (totalConversions / totalClicks) * 100;
      }

      if (totalConversions > 0) {
        costPerConversion = totalSpend / totalConversions;
      }

      return {
        totalClicks,
        totalSpend,
        totalConversions,
        conversionRate,
        costPerConversion,
      };
    };

    const currentMetrics = calculateMetricsForData(currentData);
    const previousMetrics = calculateMetricsForData(previousData);

    return {
      current: currentMetrics,
      previous: previousMetrics,
    };
  }

  function calculatePercentageDifference(
    current: number,
    previous: number
  ): number {
    let difference = current - previous;
    let relativeDifference = difference / previous;
    let percentageDifference = relativeDifference * 100;
    return percentageDifference;
  }

  function getMetricsDifference(currentMetrics: any, previousMetrics: any) {
    return {
      totalClicks: calculatePercentageDifference(
        currentMetrics.totalClicks,
        previousMetrics.totalClicks
      ),
      totalSpend: calculatePercentageDifference(
        currentMetrics.totalSpend,
        previousMetrics.totalSpend
      ),
      totalConversions: calculatePercentageDifference(
        currentMetrics.totalConversions,
        previousMetrics.totalConversions
      ),
      conversionRate: calculatePercentageDifference(
        currentMetrics.conversionRate,
        previousMetrics.conversionRate
      ),
      costPerConversion: calculatePercentageDifference(
        currentMetrics.costPerConversion,
        previousMetrics.costPerConversion
      ),
    };
  }

  const fetchData = async () => {
    try {
      const insightsData = await getAdsetInsightsData();
      const currentMonthData = filterCurrentMonthData(insightsData);
      averageSpend = calculateAverageSpend(currentMonthData);
      dailySpend = calculateDailySpend(currentMonthData);
      weeklySpend = calculateWeeklySpend(insightsData);

      averageCPC = calculateAverage(currentMonthData, "cpc");
      averageCPM = calculateAverage(currentMonthData, "cpm");
    } catch (error) {}
  };

  const fetchPeriodData = async () => {
    try {
      const data = await GrowthPageandProfile($timePeriod);
    } catch (error) {
      console.error("Error fetching GrowthPageandProfile:", error);
    }
  };

  const getFollowersData = async () => {
    try {
      const data = await GetNewFollows($timePeriod);
    } catch (error) {
      console.error("Error fetching GrowthPageandProfile:", error);
    }
  };

  const getFabData = async () => {
    try {
      const data = await page_fan_adds($timePeriod);
    } catch (error) {
      console.error("Error fetching GrowthPageandProfile:", error);
    }
  };

  $: $timePeriod, fetchInsights();
  $: $timePeriod, getFollowersData();
  $: $timePeriod, fetchPeriodData();
  $: $timePeriod, getFabData();

  const filterCurrentMonthData = (data: any) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return data.filter((item: any) => {
      const itemDate = new Date(item.date_stop);
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });
  };

  const filterMonthData = (data: any, monthOffset: number = 0) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthOffset,
      1
    );

    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    return data.filter((item: any) => {
      const itemDate = new Date(item.date_stop);
      return (
        itemDate.getMonth() === targetMonth &&
        itemDate.getFullYear() === targetYear
      );
    });
  };

  const calculateAverageSpend = (data: any) => {
    const totalSpend = data.reduce(
      (sum: any, item: any) => sum + parseFloat(item.spend),
      0
    );
    return data.length ? totalSpend / data.length : 0;
  };

  const calculateDailySpend = (data: any) => {
    const totalSpend = data.reduce(
      (sum: any, item: any) => sum + parseFloat(item.spend),
      0
    );
    const numDays = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    return totalSpend / numDays;
  };

  const calculateAverage = (data: any[], key: string) => {
    const total = data.reduce((sum, item) => {
      const value = parseFloat(item[key]);
      if (!isNaN(value)) {
        return sum + value;
      }
      return sum;
    }, 0);
    return data.length ? total / data.length : 0;
  };

  const calculateTotal = (data: any[], key: string) => {
    const total = data.reduce((sum, item) => {
      const value = parseFloat(item[key]);
      if (!isNaN(value)) {
        return sum + value;
      }
      return sum;
    }, 0);
    return total;
  };

  const calculateWeeklySpend = (data: any) => {
    const currentWeekStart = new Date();
    currentWeekStart.setDate(
      currentWeekStart.getDate() - currentWeekStart.getDay()
    );
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date();
    currentWeekEnd.setDate(
      currentWeekEnd.getDate() + (6 - currentWeekEnd.getDay())
    );
    currentWeekEnd.setHours(23, 59, 59, 999);

    const weeklyData = data.filter((item: any) => {
      const itemDate = new Date(item.date_start);
      return itemDate >= currentWeekStart && itemDate <= currentWeekEnd;
    });

    const totalSpend = weeklyData.reduce(
      (sum: any, item: any) => sum + parseFloat(item.spend),
      0
    );

    return totalSpend;
  };

  const GrowthgetFollowersData = async () => {
    try {
      const follow_data = await GetNewfollowers($timePeriod);
      const likess_data = await GetPageunlikesandunfollows($timePeriod);

      const rollingLikes = calculateRollingAverage(follow_data);
      const rollingUnlikes = calculateRollingAverage(likess_data);
    } catch (error) {
      console.error("Error fetching GrowthgetFollowersData:", error);
    }
  };
  function calculateRollingAverage(data, period = 7) {
    return data
      .map((entry, index) => {
        if (index < period - 1) return null; // Not enough data points
        let sum = 0;
        for (let i = index - period + 1; i <= index; i++) {
          sum += entry.values[i].value;
        }
        return sum / period;
      })
      .filter((val) => val !== null);
  }

  onMount(() => {
    GrowthgetFollowersData();
    fetchPeriodData();
    getFollowersData();
    getFabData();
    fetchData();
    fetchInsights();
  });
</script>

<div>
  <SpendCosts
    {averageSpend}
    {dailySpend}
    {averageCPC}
    {averageCPM}
    {weeklySpend}
  />
  {#if reachData.length != 0 && impressionData.length != 0}
    <Reach
      {averageCTR}
      {reachData}
      {impressionData}
      {currentaverageReach}
      {currentaverageImpression}
      {differenceReach}
      {differenceImpression}
      {totalReach}
      {totalImpression}
    />
  {/if}
  {#if Details && metricsDifference}
    <Conversion {metricsDifference} {Details} />
  {/if}
  <CampaignEngagements />
  <Growth />
  <FollowersGrowthCard />
</div>
