import Button from "../components/about/Button"

const About: React.FC = () => (
  <div className="p-8">
    <Button text="Hello World!" onClick={() => console.log("HALLO!")} />
  </div>
)


export default About;