import { writable } from 'svelte/store';
const labelsPlatforms = ['Facebook', 'Instagram', 'X', 'Tiktok'];

// $: data.datasets[0].data = Likes  || [];
// $: data.datasets[1].data = Facebookreactions || [];
// $: data.datasets[2].data = CommentsReplies || [];
// $: data.datasets[3].data = dataChartShares || [];
// $: data.datasets[4].data = dataChartReelViews || [];

export const valuesArray = writable([50, 0, 0, 0, 0, 0, 0]);
export const dataChartFacebook = writable({
  labels: ['Like', 'Heart', 'Care', 'Haha', 'Wow', 'Sad', 'Angry'],
  datasets: [
    {
      data: [50, 0, 0, 0, 0, 0, 0],
      label: 'Facebook reactions',
      backgroundColor: [
        '#589AFF',
        '#0D64E8',
        '#0024A4',
        '#273668',
        '#5E7BB3',
        '#9FB8DE',
        '#E9EFF8',
      ],
    },
  ],
});

export const dataChartComments = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [16, 12, 2, 0],
      label: 'Comments/Replies',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});

export const dataChartLikes = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [50, 50, 20, 0],
      label: 'Likes',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});

export const dataChartShares = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [16, 12, 2, 0],
      label: 'Shares/Reposts',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});

export const dataChartReelViews = writable({
  labels: ['Facebook', 'Instagram'],
  datasets: [
    {
      data: [150, 50],
      label: 'Reel Views',
      backgroundColor: ['#589AFF', '#0D64E8'],
    },
  ],
});

export const dataChartVisits = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [0, 0, 0, 0],
      label: 'Page/Profile visits',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});

export const dataChartNewFollowers = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [0, 0, 0, 0],
      label: 'New followers',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});

export const dataChartUnlikes = writable({
  labels: labelsPlatforms,
  datasets: [
    {
      data: [0, 0, 0, 0],
      label: 'Page unlikes/unfollows',
      backgroundColor: ['#589AFF', '#0D64E8', '#0024A4', '#273668'],
    },
  ],
});
