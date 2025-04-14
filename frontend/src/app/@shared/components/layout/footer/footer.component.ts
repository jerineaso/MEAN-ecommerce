import { Component, OnInit } from '@angular/core';

// Interface
export interface FooterItem {
  text?: string;
  isInput?: boolean;
  placeholder?: string;
}

export interface FooterSection {
  title: string;
  items: FooterItem[];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  footerSections: FooterSection[] = [
    {
      title: 'Exclusive',
      items: [
        { text: 'Subscribe' },
        { text: 'Get 10% off your first order' },
        { isInput: true, placeholder: 'Enter your email' }
      ]
    },
    {
      title: 'Support',
      items: [
        { text: '111 Bijoy sarani, Dhaka,<br>  DH 1515, Bangladesh.' },
        { text: 'exclusive@gmail.com' },
        { text: '+88015-88888-9999' }
      ]
    },
    {
      title: 'Account',
      items: [
        { text: 'My Account' },
        { text: 'Login / Register' },
        { text: 'Cart' },
        { text: 'Wishlist' },
        { text: 'Shop' }
      ]
    },
    {
      title: 'Quick Link',
      items: [
        { text: 'Privacy Policy' },
        { text: 'Terms of Use' },
        { text: 'FAQ' },
        { text: 'Contact' }
      ]
    },
    {
      title: 'Download App',
      items: [
        { text: 'Save $3 with App New User Only' }
      ]
    }
  ];

  constructor() { }
  ngOnInit(): void { }
}
