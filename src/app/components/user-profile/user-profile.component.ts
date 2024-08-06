import { Component, signal } from '@angular/core'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  // tworzenie WritableSignal
  protected readonly user = signal<User | null>(null)

  // dostęp do wartości WritableSignal
  getUserName() {
    return this.user()?.name
  }

  // aktualizacja wartości WritableSignal
  setUser(user: User) {
    this.user.set(user)
    // lub
    this.user.update(prevValue => user)
  }
}
