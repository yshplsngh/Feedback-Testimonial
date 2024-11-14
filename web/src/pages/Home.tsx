// import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  // useEffect(() => {
  //   const fetchFeedbacks = async () => {
  //     try {
  //       const response = await fetch(
  //         '',
  //       );
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('There was a problem with the fetch operation:', error);
  //     }
  //   };
  //
  //   fetchFeedbacks();
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {/*<iframe*/}
        {/*  height="400px"*/}
        {/*  width="100%"*/}
        {/*  src={'https://testimonialserver.yshplsngh.in/api/space-name'}*/}
        {/*/>*/}

        {/*<iframe*/}
        {/*  height="400px"*/}
        {/*  width="100%"*/}
        {/*  src={'https://testimonialserver.yshplsngh.in/api/feedback/getFeedbacks/space-name'}*/}
        {/*/>*/}

        {/*<iframe*/}
        {/*  height="400px"*/}
        {/*  width="100%"*/}
        {/*  src={'https://testimonial.yshplsngh.in/'}*/}
        {/*/>*/}
      </div>
    </motion.div>
  );
};

export default Home;
