import { TypeAnimation } from "react-type-animation";

export const Banner = () => {
  return (
    <div className="content-page ">
      <div className="jumbotron  jumbotron-fluid position-relative overlay-bottom overlay-top banner-container">
        <div className="container text-center my-5 py-5 container-banner-text ">
          <h1 className="text-white mt-4 mb-4 banner-subheading">
            <TypeAnimation
              sequence={[
                "🌍 Bridging the Gap in Education!",
                1000,
                "📖 Knowledge at Your Fingertips!",
                1000,
                "🎯 Learn Smarter, Not Harder!",
                1000,
                "📲 Education in the Digital Age!",
                1000,
                "🤖 AI-Powered Learning Revolution!",
                1000,
                "🧠 Unlock Your Full Potential!",
                1000,
                "📚 Learn Anytime, Anywhere!",
                1000,
                "🚀 Empowering Minds with Technology!",
                1000,
                "💡 Personalized Learning for Everyone!",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </h1>
          <h1 className="text-white display-1 mb-5 banner-heading">
            <TypeAnimation
              sequence={[
                "📚 Explore a World of Knowledge!",
                2000,
                "🚀 Learn Anytime, Anywhere!",
                2000,
                "🎯 Personalized Learning Experience!",
                2000,
                "🤖 AI-Powered Smart Courses!",
                2000,
                "🔍 Track Your Progress in Real Time!",
                2000,
                "🎓 Expert-Led Online Classes!",
                2000,
                "🌍 Connect with Global Learners!",
                2000,
                "📲 Interactive & Engaging Lessons!",
                2000,
                "🏆 Earn Certificates & Boost Your Career!",
                2000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </h1>
        </div>
      </div>
    </div>
  );
};
