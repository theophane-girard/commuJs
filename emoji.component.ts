@Component({
  selector: 'emoji-component',
  template: `<span ng>`
})
export class EmojiComponent {
  @Input() isVisible = false
}