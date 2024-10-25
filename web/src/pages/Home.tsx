import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
        dolorem est excepturi illo officiis quasi ullam voluptatibus? Aliquid
        asperiores at blanditiis consectetur, debitis deleniti deserunt
        doloremque ex facilis harum impedit in inventore iste maiores modi
        mollitia neque non nulla numquam officia officiis pariatur porro
      </div>
    </motion.div>
  );
};

export default Home;
