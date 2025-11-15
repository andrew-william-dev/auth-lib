import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { DropDownItems } from './constant';

@Component({
  tag: 'as-header',
  styleUrl: 'as-header.css',
  shadow: true,
})
export class AsHeader {
  @Prop() appTitle: string;
  @Prop() userName: string;
  @Prop() items: DropDownItems[];
  @Prop() logoutFunction: (event: PointerEvent) => void;

  @State() isOpen: boolean = false;

  @Element() hostEl: HTMLElement;

  private handleLogout = (event: PointerEvent) => {
    event.stopPropagation();

    if (this.logoutFunction) {
      this.logoutFunction(event);
    }
    this.isOpen = false;
  };

  private getInitials = () => {
    if (!this.userName) return '';
    const parts = this.userName.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  private handleDropdown = () => {
    this.isOpen = !this.isOpen;
  };

  private onDocumentClick = (event: MouseEvent) => {
    if (!this.isOpen) return;

    const target = event.composedPath
      ? event.composedPath()[0] as Node
      : (event.target as Node);

    if (!this.hostEl.contains(target)) {
      this.isOpen = false;
    }
  };

  componentDidLoad() {
    document.addEventListener('click', this.onDocumentClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  render() {
    return (
      <Host>
        <slot>
          <div class="header">
            <div class="header-container">
              <div class="logo-title" onClick={() => window.location.href="/"}>
                <img src="../../assets/android-chrome-512x512.png" alt="" />
                <h1>{this.appTitle}</h1>
              </div>

              <div class="header-links">
                <span class="avatar" onClick={this.handleDropdown}>
                  {this.getInitials()}
                </span>

                {this.isOpen && (
                  <div class="dropdown">
                    <span class="dropdown-name">{this.userName}</span>

                    {this.items?.length > 0 &&
                      this.items.map((item: DropDownItems) => (
                        <button
                          class="dropdown-item"
                          type="button"
                          onClick={item.onClick}
                        >
                          {item.name}
                        </button>
                      ))}

                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </div>
          </div>
        </slot>
      </Host>
    );
  }
}
