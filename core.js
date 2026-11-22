(function(g){
function dn(s){const[y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/864e5}
function ds(n){const x=new Date(n*864e5);return x.toISOString().slice(0,10)}
function plan(o){
 const a=+o.start,b=+o.target,cur=+o.current,s=dn(o.startDate),e=dn(o.endDate),D=e-s;
 if(!(D>0))return{error:'The finish date must be after the start date.'};
 if(a===b)return{error:'Start and target are the same number.'};
 const dir=b>a?1:-1,val=i=>a+(b-a)*i/D;
 const ms=[];let y=+o.startDate.slice(0,4),m=+o.startDate.slice(5,7);
 for(;;){const last=Date.UTC(y,m,0)/864e5;if(last>=e)break;if(last>s)ms.push({date:ds(last),expected:val(last-s)});m++;if(m>12){m=1;y++}}
 ms.push({date:o.endDate,expected:b});
 const t=Math.min(Math.max(dn(o.today)-s,0),D),exp=val(t),rem=D-t;
 const r={days:D,weekly:(b-a)*7/D,milestones:ms,expectedToday:exp,ahead:(cur-exp)*dir,remainingDays:rem,
  reached:(cur-b)*dir>=0,pct:(cur-a)/(b-a)*100,requiredWeekly:rem>0?(b-cur)*7/rem:null,checkpoints:[]};
 if(rem>0&&!r.reached)for(let k=1;k<=12;k++){const d=Math.min(7*k,rem);r.checkpoints.push({date:ds(s+t+d),value:cur+(b-cur)*d/rem});if(d===rem)break}
 return r}
g.plan=plan;g.dn=dn;g.ds=ds;if(typeof module!=='undefined')module.exports={plan,dn,ds};
})(typeof window!=='undefined'?window:globalThis);
