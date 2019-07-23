export function immocForm (Comp) {
  return class WrapperComp extends Comp {
    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange (key, val) {
      this.setState({
        [key]: val
      })
    }
  }
}