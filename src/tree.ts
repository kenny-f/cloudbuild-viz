import { Step } from './parse'

export const tree = (steps: Step[]) => {
  let mermaid = ['graph TD']

  steps.forEach(step => {
    if (!step.waitFor) {
      mermaid.push(step.id);
      return;
    }

    step.waitFor.forEach(w => {
      mermaid.push(`${w}-->${step.id}`)
    })
  })

  return mermaid.join('\n')
}
