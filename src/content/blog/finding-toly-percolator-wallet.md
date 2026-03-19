---
title: "How I Verified Toly's Percolator Involvement (And Why You Should Always Check the Source)"
description: "The story of finding deadshotXBT's tweet, tracing the GitHub proof, and verifying it was really the Solana founder"
pubDate: 'Mar 19 2025'
heroImage: '../../assets/solana-hunting.jpg'
---

I was doomscrolling X like any other day when a tweet from @deadshotXBT stopped me mid-scroll.

They were claiming Toly — Anatoly Yakovenko, the founder of Solana — was involved with something called Percolator. Big if true, obviously. But here's the thing about crypto Twitter: **everyone claims everything.** Half the "alpha" on my feed is just people making stuff up for engagement.

So I did what I always do. I checked the proof.

## The Tweet

Deadshot had included a link in the tweet. Not to some anon Telegram chat or sketchy Medium post. A GitHub commit link. That got my attention. Anyone can tweet "Toly is behind this." But linking to actual code? That's a different level of claim.

I clicked it.

## The GitHub Commit

The link took me to a commit in the Percolator repository. There it was — an actual code change, timestamped, signed, sitting in the project's history.

But I wasn't done. Anyone can fake a screenshot. Anyone can spoof a commit message. I needed to know: **was this actually Toly?**

I checked the author details on the commit. Cross-referenced with Toly's public GitHub profile. Matched the email domain, the username, the commit history pattern. Then I went deeper — checked his other repositories, his activity on Solana's official repos, the timeline of his public commits versus this one.

It all lined up. Same email. Same signing key. Same commit style. This wasn't a forgery or a spoof. **The Solana founder had actually committed code to Percolator.**

## What I Learned

Here's what stuck with me: in a space full of noise, primary sources are everything. That tweet could've been BS. Probably 90% of similar claims are. But deadshot did the work — found the commit, shared the link, let people verify for themselves.

And me? I almost kept scrolling. If that tweet hadn't included a real link to real code, I would've written it off as another hype post. Instead, I spent 10 minutes doing basic verification and found something real.

The Percolator CA itself wasn't hard to find after that. Once you know the founder's GitHub is connected, the contract details are just a few clicks away in the same repo. Deployment scripts, configuration files, the address right there in the code.

But the actual skill wasn't finding the CA. **It was verifying the connection in the first place.**

## The Takeaway

Crypto runs on rumors. "Trust me bro" is basically a currency. But the chain doesn't lie, and neither does a verified GitHub commit from a public figure.

If someone claims a big name is involved with a project, don't just retweet it. Check their proof. Follow the link. Verify the signature. Look at the actual commit author. It takes five minutes and saves you from looking like an idiot later.

As for Percolator? I'm watching it now. Not because some anon on Twitter told me to, but because I verified the connection myself. There's a difference between hearing something and knowing something.

Do the work. Check the source. The truth is usually just a few clicks away if you bother to look.

---

*Ever caught someone faking proof on CT? Or found a real connection that everyone else missed? Drop your story — I read every reply.*
