import Button from "../components/about/Button"
import Box from "../components/about/Box"

const About: React.FC = () => (
  <div className="p-8">
    <Button text="Hello World!" onClick={() => console.log("HALLO!")} />
          <Box text="box hehe"/>

  </div>

)


export default About;