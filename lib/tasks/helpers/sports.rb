module Populator
    module Sports
  
      def create_sports
        
        @football = FactoryBot.create(:sport, name: "football")
        @baseball = FactoryBot.create(:sport, name: "baseball")

        @football_nfl = FactoryBot.create(:league, name: "NFL", sport: @football)
        @football_xfl = FactoryBot.create(:league, name: "XFL", sport: @football)
        @baseball_mlb = FactoryBot.create(:league, name: "MLB", sport: @baseball)
        @baseball_milb = FactoryBot.create(:league, name: "MiLB", sport: @baseball)

        FactoryBot.create(:club, name: "Steelers", league: @football_nfl)
        FactoryBot.create(:club, name: "Patriots", league: @football_nfl)
        FactoryBot.create(:club, name: "Pirates", league: @baseball_mlb)
        FactoryBot.create(:club, name: "Yankees", league: @baseball_mlb)

      end 

    end 
end 