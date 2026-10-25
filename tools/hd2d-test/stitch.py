import subprocess, sys
P=24; PAD=12
maps=[
 ('cistern','cistern.png',40,28,-4.0,'THE CISTERN','Colony 2 · flooded waterworks · HOVER gate'),
 ('scar','scar.png',52,34,-9.5,'THE RUST MILE','Route · the dead interstate · first vehicle Ohm'),
 ('railhead','railhead.png',44,28,-6.0,'RAILHEAD','Colony 1 · the rail junction'),
 ('farmroad','farmroad.png',28,30,7.0,'THE FARM ROAD','Route · north to the Railhead'),
 ('field','field.png',40,28,0.0,'THE FIELD','Ohmstead surface · the prologue'),
 ('ohmstead','ohmstead_c.png',44,31,-4.4,'OHMSTEAD','Home colony · underground, beneath the Field'),
]
GAP=5; M=3
minx=min(m[4] for m in maps); maxx=max(m[4]+m[2] for m in maps)
W=int((maxx-minx+2*M)*P)
y=M+GAP; place=[]
for m in maps:
    if m[0]=='ohmstead': y+=2
    place.append((m,y)); y+=m[3]+GAP
H=int((y-GAP+M)*P)
X=lambda u:int((u-minx+M)*P)
pos={m[0]:(m,yy) for m,yy in place}
cmd=['convert','-size',f'{W}x{H}','xc:#121418']
for upx,a,b,dnx in [(20.5,'cistern','scar',26.0),(26.0,'scar','railhead',22.5),(22.5,'railhead','farmroad',9.5),(9.5,'farmroad','field',20.5)]:
    (ma,ya),(mb,yb)=pos[a],pos[b]
    x1,y1=X(ma[4]+upx),int((ya+ma[3])*P); x2,y2=X(mb[4]+dnx),int(yb*P)
    cmd+=['-stroke','#5f5c57','-strokewidth','44','-draw',f'line {x1},{y1} {x2},{y2}','-stroke','#b49a52','-strokewidth','3','-draw',f'line {x1},{y1} {x2},{y2}']
(mf,yf),(mo,yo)=pos['field'],pos['ohmstead']
fx,fy=X(mf[4]+20.5),int((yf+17.2)*P); ox,oy=X(mo[4]+24.9),int((yo+10.0)*P)
for m,yy in place:
    crop=f'{m[2]*P}x{m[3]*P}+{PAD}+{PAD}' if m[0]!='ohmstead' else f'{m[2]*P}x{m[3]*P}+0+0'
    cmd+=['(',m[1],'-crop',crop,'+repage','-bordercolor','#c9a45c','-border','2',')','-geometry',f'+{X(m[4])-2}+{int(yy*P)-2}','-composite']
cmd+=['-fill','none','-stroke','#7fe0c8','-strokewidth','5','-draw',f'stroke-dasharray 16 12 line {fx},{fy} {ox},{oy}']
for m,yy in place:
    lx=X(m[4]); top=int(yy*P)
    cmd+=['-stroke','none','-fill','#f1dfb1','-font','DejaVu-Serif-Bold','-pointsize','38','-annotate',f'+{lx}+{top-40}',m[5]]
    cmd+=['-fill','#b9ad95','-font','DejaVu-Sans','-pointsize','20','-annotate',f'+{lx}+{top-12}',m[6]]
cmd+=['-stroke','#121418','-strokewidth','6','-fill','#7fe0c8','-font','DejaVu-Sans-Bold','-pointsize','24','-annotate',f'+{fx+16}+{fy+30}','the lift down','-stroke','none','-annotate',f'+{fx+16}+{fy+30}','the lift down']
cmd+=['-fill','#e8d9a8','-font','DejaVu-Sans-Bold','-pointsize','30','-annotate',f'+{W-110}+{56}','N ↑']
cmd+=['world_map.png']
subprocess.run(cmd,check=True)
