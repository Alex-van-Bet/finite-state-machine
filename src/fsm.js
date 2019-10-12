class FSM {
  /* Создает новый экземпляр FSM.
   * @param config
   */
  constructor(config) {
    this.arrStates = [];
    this.initial = config.initial;
    this.activeState = config.initial;
    this.variationStates = config.states;
    this.arrSteps = [];
    this.arrSteps.push(config.initial);
    this.counter = 1;
  }

  /* Возвращает активное состояние.
   * @returns {String}
   */
  getState() {
    return this.activeState;
  }

  /* Идет в указанное состояние.
   * @param state
   */
  changeState(state) {
    if (!this.variationStates[state]) {
      throw new Error;
    }
    this.activeState = state;
    this.arrSteps.push(this.activeState);
    this.counter = this.arrSteps.length - 1;
   
    
  }

  /* Изменяет состояние в соответствии с правилами перехода событий.
   * @param event
   */
  trigger(event) {
      if (!this.variationStates[this.activeState].transitions[event]) {
        throw new Error;
      } 
      this.activeState = this.variationStates[this.activeState].transitions[event];
      this.arrSteps.push(this.activeState);
      this.counter = this.arrSteps.length - 1;
      
  }


  /* Сбрасывает состояние FSM в исходное состояние.
  */
  reset() {
      this.activeState = this.initial;

  }

  /* Возвращает массив состояний, для которых есть определенные правила перехода событий.
   * Возвращает все состояния, если аргумент не определен.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    this.arrStates = [];
      if (event){
        for (let key in this.variationStates){
          if (this.variationStates[key].transitions[event]){
            this.arrStates.push(key);
          }
        }
        return (this.arrStates);
      }
      else {
        return (Object.keys(this.variationStates));
      }
  }

  /* Возвращается к предыдущему состоянию.
   * Возвращает false, если отмена недоступна.
   * @returns {Boolean}
   */
  undo() {
    if (this.counter > 0){
      this.counter -= 1;
      this.activeState = this.arrSteps[this.counter];
      return true;
    }
    else{
      return false;
    }
  }

  /* Идет переделывать в штат.
   * Возвращает false, если повтор недоступен.
   * @returns {Boolean}
   */
  redo() {
    if (this.counter < this.arrSteps.length - 1){
      this.counter += 1;
      this.activeState = this.arrSteps[this.counter];
      return true;
    }
    else{
      return false;
    }
 
  }
  /* Очищает историю переходов
   */
  clearHistory() {
    this.arrSteps = [];
    this.counter = 0;
  }
}

module.exports = FSM;
