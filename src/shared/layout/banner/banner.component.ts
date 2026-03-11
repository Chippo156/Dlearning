import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  subTexts = [
    '🌍 Bridging the Gap in Education!',
    '📖 Knowledge at Your Fingertips!',
    '🎯 Learn Smarter, Not Harder!',
    '📲 Education in the Digital Age!',
    '🤖 AI-Powered Learning Revolution!',
    '🧠 Unlock Your Full Potential!',
    '📚 Learn Anytime, Anywhere!',
    '🚀 Empowering Minds with Technology!',
    '💡 Personalized Learning for Everyone!',
  ];

  mainTexts = [
    '📚 Explore a World of Knowledge!',
    '🚀 Learn Anytime, Anywhere!',
    '🎯 Personalized Learning Experience!',
    '🤖 AI-Powered Smart Courses!',
    '🔍 Track Your Progress in Real Time!',
    '🎓 Expert-Led Online Classes!',
    '🌍 Connect with Global Learners!',
    '📲 Interactive & Engaging Lessons!',
    '🏆 Earn Certificates & Boost Your Career!',
  ];

  subIndex = 0;
  mainIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.subIndex = (this.subIndex + 1) % this.subTexts.length;
    }, 2000);

    setInterval(() => {
      this.mainIndex = (this.mainIndex + 1) % this.mainTexts.length;
    }, 3000);
  }
}
