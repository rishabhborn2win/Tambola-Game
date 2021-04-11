import React from "react";
import { Link } from "react-router-dom";

const Rules = (props) => {
  return (
    <div class="content-posts">
      <article class="post clearfix post-24 page type-page status-publish hentry">
        <div class="entry-wrap even">
          <div class="entry-content">
            <header>
              <h1 class="entry-title">
                <a href="/" title="Tambola Rules">
                  Tambola Rules
                </a>
              </h1>
              <div class="line">
                <div class="whitespace">
                  <div class="date-title">
                    <i class="icon-time"></i> Apr 11, 2021 &nbsp; - &nbsp;{" "}
                    <i class="icon-comments-alt"></i>{" "}
                    <Link
                      to="/aboutus"
                      className="comments-link"
                      onClick={(e) => props.function(e)}
                    >
                      How To Play?
                    </Link>{" "}
                    &nbsp; &nbsp;{" "}
                  </div>
                </div>
              </div>
            </header>

            <div class="post-content">
              <h1>Tambola Rules</h1>
              <p>
                Tambola, also known as Tombola, Bingo or Housie is a popular
                game that is believed to be originated in Italy in early 1500s.
                Although Bingo is the name used in most of the western
                countries, India, Pakistan and other South East Asian countries
                prefer to call this game of probability as Tambola or Tombola.
                The game is fun to play and easy to learn. The rules of Tambola
                are as given below:
              </p>
              <h3>Tambola Tickets</h3>
              <p>
                As a rule, each player must buy at least one ticket to enter a
                game. A typical 90 ball Tambola ticket consists of 3 rows and 9
                columns which make 27 spaces. Each row has a total of 5 numbers
                printed on it. A column can have 1, 2 or the maximum 3 numbers
                printed on it. The first column in the ticket will have numbers
                from 1-9, the second column will have 10-19, third column with
                20-29 and so on until the 9<sup>th</sup> column which will be
                numbered in between 80-90.
              </p>
              <h3>
                <strong>Gameplay</strong>
              </h3>
              <p>
                The game begins with a ball draw. As the game progresses, the
                board is marked with each ball that is drawn. The objective of
                the game is to mark/ dab all the numbers found in the ticket as
                called by the dealer. The player who first mark all the numbers
                in a winning pattern and calls a win is declared as the WINNER
                of that pattern after the dealer checks his ticket and verify it
                with numbers drawn.
              </p>
              <p>
                If your claimed winning pattern is wrong, it will be called
                BOOGY and you cannot continue the game with the same ticket.
              </p>
              <p>
                The game ends when all 90 numbers are drawn, or when a winner is
                declared for all the patterns of the game, whichever comes
                first.
              </p>
              <h3>
                <strong>
                  Tambola Winning Patterns
                  <br />
                </strong>
              </h3>
              <p>
                In order to win in Tambola or Bingo, you need to match winning
                combinations. Some of the popular winning combinations in a
                Tambola game are given below:
              </p>
              <ul>
                <li>Early Five : The ticket with first five number dabbed</li>
                <li>
                  Top Line: The ticket with all the numbers of the top row
                  dabbed fastest.
                </li>
                <li>
                  Middle Line: The ticket with all the numbers of the middle row
                  dabbed fastest.
                </li>
                <li>
                  Bottom Line: The ticket with the numbers of the bottom row
                  dabbed fasted.
                </li>
                <li>
                  Four Corners: The ticket with all four corners marked first
                  i.e. 1<sup>st</sup> and last numbers of top and bottom rows.
                </li>
                <li>
                  Full House: The ticket with all the 15 numbers marked first.
                </li>
              </ul>
              <p>
                There are more than 22 winning patterns in Tambola and prizes
                for each pattern may vary also depending on the pattern the
                player claims.
              </p>

              <div class="pagelink"></div>
            </div>
          </div>
        </div>{" "}
      </article>
    </div>
  );
};

export default Rules;
