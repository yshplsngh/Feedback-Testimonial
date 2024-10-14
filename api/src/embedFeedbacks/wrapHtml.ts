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
}: {
  feedbacks: propsType[];
  theme: string;
}) {
  const themeColors =
    theme === 'dark'
      ? {
          color: '#f4f4f5',
        }
      : {
          color: '#000000',
        };

  const feedbackCards = feedbacks
    .map((feedback) => {
      const starsHtml = Array.from({ length: 5 })
        .map(
          (_, index) =>
            `<div class="star">
        <svg class="starSvg" viewBox="0 0 51 48">
          <path  style="--tw-shadow-color: #ffb621; ${feedback.stars >= index + 1 ? 'fill:#ffb621' : 'fill:#d1d5db'}"
            d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
          />
        </svg>
      </div>`,
        )
        .join('');

      return `
      <div class="feedback">
        <div class="avatarname">
          <span class="avatar">${feedback.name.substring(0, 2)}</span>
          <p class="name">${feedback.name.length > 20 ? feedback.name.substring(0, 20) + '..' : feedback.name}</p>
        </div>
        <p class="message">${feedback.customerFeedback}</p>
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
        <title>Embed</title>
        <style>
          *{
            margin:0;
            padding:0;
          }
          .bd{
            border: 1px solid red;
          }
          .main{
             background-color: #151b23;
             padding: 1rem;
             display: flex;
             justify-content: center;
             align-items: center;
          }
          .feedbacks{
            display: grid;
            width: fit-content;
            grid-template-columns: repeat(1, 1fr);
            gap: 0.5rem;
          }
          @media (min-width: 850px) {
            .feedbacks {
              grid-template-columns: repeat(2, 1fr);
             }
          }
          @media (min-width: 1250px) {
            .feedbacks {
              grid-template-columns: repeat(3, 1fr);
            }
          }
  
          .feedback {
            border: 1px solid #27272a;
            background-color: #0d1117;
            color: ${themeColors.color};
            border-radius: 0.8rem;
            padding: 1.3rem;
            width: 22rem;
            display: flex;
            flex-direction: column;
            row-gap: 1.3rem;
            height: fit-content;
          }
          .footer{
            display: flex;
            justify-content: space-between;
          }
          .avatarname{
            display: flex;
            justify-content: start;
            align-items: center;
            column-gap: 0.5rem;
          }
          .avatar{
            background-color: #dddddd;
            border-radius: 50%;
            color: black;
            text-transform: uppercase;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.1rem;
            width: 2.4rem;
            height: 2.4rem;
          }
          .name{
            text-transform: capitalize;
            font-size: 0.9rem;
            color: #dddddd;
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
          .message{
            font-size: 1rem;
          }
          .date{
            font-size: 0.8rem;
            color: #d1d5db;
          }
          </style>
        </head>
        <body>
          <main class="bd main">
            <div class="bd feedbacks">
              ${feedbackCards}
            </div>
          </main>
        </body>
      </html>
    `;
}
