const Testing = () => {
  return (
    <div className={'flex items-center justify-center border border-green-700'}>
      <iframe
        height="400px"
        width="100%"
        src={'http://localhost:4000/api/feedbacks/space?theme=light&speed=6'}
      />

      {/*<iframe height="800px" id='testimonialto-space-name4-tag-all-light-animated'*/}
      {/*        src="https://embed-v2.testimonial.to/w/space-name4?animated=on&theme=dark&shadowColor=ffffff&speed=1&tag=all"*/}
      {/*        frameBorder="0" scrolling="no" width="100%"></iframe>*/}
    </div>
  );
};

export default Testing;
