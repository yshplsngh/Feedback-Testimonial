import { format } from 'date-fns';

interface propsType {
  id: number;
  name: string;
  stars: number;
  customerFeedback: string;
  createdAt: Date;
}

export default function wrapHtml({
  feedbacks,
  theme,
  speed,
}: {
  feedbacks: propsType[];
  theme: string | undefined;
  speed: string | undefined;
}) {
  // if the theme is undefined or null, then set dark
  theme = theme ?? 'dark';
  // if the theme is neither dark nor light set dark
  theme = theme !== 'dark' && theme !== 'light' ? 'dark' : theme;
  // if speed is not provided, set speed 5
  speed = speed ?? '15';

  const css =
    theme === 'dark'
      ? {
          color: '#f4f4f5',
          backgroundColor: '#0d1117',
          borderColor: '#27272a',
          nameColor: '#f0f0f0',
          messageColor: '#e2e8f0',
          dateColor: '#a0aec0',
        }
      : {
          color: '#000000',
          backgroundColor: '#f4f4f5',
          borderColor: '#e5e7eb',
          nameColor: '#000000',
          messageColor: '#333333',
          dateColor: '#6b7280',
        };

  const cLength = feedbacks.length;
  const animationDuration = +speed * cLength;

  const avatarColors = [
    '#AED581',
    '#81D4FA',
    '#FFD54F',
    '#FF8A65',
    '#BA68C8',
    '#4FC3F7',
    '#FFF176',
    '#7986CB',
    '#A1887F',
    '#4DB6AC',
    '#F06292',
    '#9575CD',
    '#FFB74D',
    '#64B5F6',
    '#81C784',
    '#DCE775',
    '#FFD740',
    '#90A4AE',
    '#F48FB1',
    '#7E57C2',
  ];

  const feedbackCards = feedbacks
    .map((feedback, index) => {
      const randomAvatarColor =
        avatarColors[Math.floor(Math.random() * avatarColors.length)] ??
        '#dddddd';

      const starsHtml = Array.from({ length: 5 })
        .map(
          (_, index) => `<div class="star">
                <svg class="starSvg" viewBox="0 0 51 48">
                  <path  style="--tw-shadow-color: #ffb621; ${feedback.stars >= index + 1 ? 'fill:#ffb621' : 'fill:#d1d5db'}"
                    d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                  />
                </svg>
              </div>`,
        )
        .join('');

      return `
          <div class="item" style="animation-delay: calc(${animationDuration}s / ${cLength} * (${cLength} - ${index + 1}) * -1)">
            <div class="avatarname">
              <span class="avatar" style="background-color: ${randomAvatarColor}">${feedback.name.substring(0, 2)}</span>
              <p class="name">${feedback.name}</p>
            </div>
            <p class="message">${feedback.customerFeedback.length > 200 ? feedback.customerFeedback.substring(0, 200) + '...' : feedback.customerFeedback}</p>
            <div class="footer">
              <p class="date">${format(new Date(feedback.createdAt), 'dd MMM, yyyy')}</p>
              <div class="stars">${starsHtml}</div>
            </div>
          </div>`;
    })
    .join('');

  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Feedbacks</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          *, *::before, *::after {
              box-sizing: border-box;
          }
          * {
              margin:0;
              padding:0;
              font-family: 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
          }
           .bd{
                border: 1px solid green;
              }
          .wrapper {
          background-color: transparent;
            width: 95%;
            height: 100%;
            max-width: 1536px;
            margin-inline: auto;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            mask-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 1) 5%,
              rgba(0, 0, 0, 1) 95%,
              rgba(0, 0, 0, 0)
            );
          }
          .wrapper:hover .item {
            animation-play-state: paused;
          }
          @keyframes scrollLeft {
            to {
              left: -20rem;
            }
          }            
          .item {
            width: 20rem;
            height: fit-content;
            background-color: ${css.backgroundColor};
            border: 1px solid ${css.borderColor};
            border-radius: 0.6rem;
            display: flex;
            flex-direction: column;
            row-gap: 0.8rem;
            padding: 1rem;
            position: absolute;
            left: max(calc(20rem * ${cLength}), 100%);
            animation-name: scrollLeft;
            animation-duration: ${animationDuration}s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
            transition: box-shadow 0.3s ease;
          }
          .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .avatarname{
            display: flex;
            justify-content: start;
            align-items: center;
            column-gap: 0.6rem;
          }
          .avatar{
            border-radius: 50%;
            color: black;
            text-transform: uppercase;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.1rem;
            width: 2.4rem;
            height: 2.4rem;
            font-family: 'Roboto', sans-serif;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          }
          .name {
            text-transform: capitalize;
            color: ${css.nameColor};
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 12rem;
          }
          .stars{
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 0.25rem;
            width: fit-content;
          }
          .star{
            display: inline-block;
            vertical-align: middle;
          }
          .starSvg{
            width: 1.25rem;
            height: 1.25rem;
          }
          .message {
            font-size: 0.95rem;
            line-height: 1.5;
            color: ${css.messageColor};
            padding-left: 0.5rem;
          }
          .date {
            font-size: 0.75rem;
            font-weight: 600;
            color: ${css.dateColor};
            letter-spacing: 0.03em;
            text-transform: uppercase;
            opacity: 0.8;
            transition: opacity 0.2s ease;
            height: fit-content;
          }
          .item:hover .date {
            opacity: 1;
          }
          @media (max-width: 600px) {
          .wrapper{
                  mask-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 1) 5%,
              rgba(0, 0, 0, 1) 95%,
              rgba(0, 0, 0, 0)
            );
          }
           @keyframes scrollLeft {
            to {
              left: -16rem;
            }
          }  
            .item {
               padding: 0.5rem;
              width: 16rem;
              left: max(calc(16rem * ${cLength}), 100%);
                      row-gap: 0.6rem;
            }
            .avatar {
            font-size: 0.8rem;
            width: 2rem;
            height: 2rem;
            }
            .name{
              font-size: 0.88rem;
            }
            .message{
            font-size: 0.82rem;
            }
                  .date {
            font-size: 0.7rem;
            }
                  .stars{
            column-gap: 0.15rem;
          }
            .starSvg{
            width: 1rem;
            height: 1rem;
          } 
          }     
        </style/>
      </head>
      <body>
         <div class="slow wrapper">
            ${feedbackCards}
         </div>
      </body>
    </html>
  `;
}
