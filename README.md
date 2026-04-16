# About app

Bingo app for Leśne Soboty with a grid that you complete if some event happens at that expedition

## Features

- 5x5 grid that randomly (except middle field, it's free) fills with some situations that may occur on our trips
- After you get completed line horizontally/vertically/diagonally you win

## How to bundle apk

- paste this in terminal : npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

- and then create apk through android studio, make sure assets folder in android>app>src>main exists

## Author

```txt
            :-                     :.
           .-:                   .:.:
          .=.:                   :-.:.
         .-..:                   :- .=.
         -: .:                   :-  -:
        --  .:         ..        ::  .-.
       :-   .:         .-:       :.   -.
      .-.   .............-:......-.   ::
      -:                              .-
     ::.                              .-.
    .-     .::::..           .....     .=
   .:. ..::.     .-.      .-:.. ..-..   =.     __ _  ____  ____  _  _  __  ____  ____  _  _  __ _
   ...                                  .-.   (  / )(  _ \(  __)( \/ )(  )(  __)(  __)( \/ )(  ( \
  .:.            .::-::-::.              -.    )  (  )   / ) _) / \/ \ )(  ) _)  ) _)  )  / /    /
  ..               .=++=.                ::   (__\_)(__\_)(____)\_)(_/(__)(__)  (__)  (__/  \_)__)
...        ...::--:::==:::--:::...       .-.
 .::  ..-+++-:..::==..==::---..:-+++-..   -.
   .::.:--::==+=---++==+++=+=--=++=-::::::.::.
      ::.:===:=+++++-=+#-:++=-:::..-++=-==:...
       ..-..--=-:=+=-=+=--+-:::=+:..:-:....
          .-..:---::-=-::=-:--:..:=:.
            .::..-:.-..::::::.:=...
               ::...:......:-:.
                 .:: ..::=.
                    .....

```
