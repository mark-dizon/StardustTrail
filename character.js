
Character = function(stats, skills){
  
  stats = stats || {};
  this.stats = {};
  var that = this;

  this.luck = 10; // ???
  
  _(StatNames).each(function(statName){
    that.stats[statName] = stats[statName] || 1;
  });

  this.skills = skills || [];
  /*
    Simple implementation, we can change this whenever.
  */
  this.check = function(skillName, diceSides){
    console.log("Checking: " + skillName);
    diceSides = diceSides || 0;
    var fromStat = this.skills[skillName] || 0;
    var fromSkill = _.contains(this.skills, skillName) * SkillBonus;
    var roll = _.random(0, diceSides);
    console.log("Rolled a "+ roll);
    var result = fromSkill + fromStat + roll;
    console.log("Result: " + result);
    return result;
  };

  this.loseLuck = function(amount){
    console.log("Losing luck :(");
    this.luck = this.luck - amount;
    if (this.luck < 1){ this.die();}
  };

  this.die = function(){
    console.log("You died."); // ???
  };

  /*
    sample check format: (Steal something and then get away)
    [
      {
        skill: 'lockpicking',
        diceSides: 6,
        difficulty: 2
      },
      {
        skill: 'bluffing',
        diceSides: 4,
        difficulty: 2,
        badStuff: function(me){ me.loseLuck(1);}
      }
    ]
  */

  this.tryTask = function(checks){
    var that = this;
    var result = _.reduce(checks, function(accResult, check) {
      console.log("Checking Task part.");
      console.log("Current score: " + accResult);
      console.log("Next check: " + check.skill);
      if (accResult < 0){ 
        console.log("Already failed...");
        return accResult; 
      }
      var checkScore = that.check(check.skill, check.diceSides);
      var difference = checkScore - check.difficulty;
      if (difference > 0){
        console.log("Success!");
        console.log("difference: " + difference);
        return difference + accResult;
      } else {
        if (check.badStuff){ check.badStuff(that); }
        return -1;
      }
    }, 0);
    return result;
  };
};
